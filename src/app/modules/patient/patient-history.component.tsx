import { Placeholder } from '@app/components';
import { useSupabase } from '@app/core/use-supabase';
import { Button, Card, FaIcon, Flex, H3, LinkButton, LoadingState, ShimmerBox } from '@atomic';
import type React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { tv } from 'tailwind-variants';
import { formatTimestampToDate } from '../utils';
import type { Patient } from './patient.model';
import type { PatientHistory as PatientHistoryModel } from './patient-history.model';
import { usePatientHistoryList } from './use-patient-history-list';

interface PatientHistoryProps {
  patient: Patient | undefined;
}

export const PatientHistory: React.FC<PatientHistoryProps> = props => {
  const {
    data: history,
    loading: loadingHistory,
    error: errorHistory,
    execute: fetchHistory,
  } = usePatientHistoryList();

  const supabase = useSupabase();

  useEffect(() => {
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patient_history',
        },
        () => fetchHistory(props.patient?.id || ''),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase.channel, supabase.removeChannel, fetchHistory, props.patient?.id]);

  useEffect(() => {
    fetchHistory(props.patient?.id || '');
  }, [fetchHistory, props.patient?.id]);

  return (
    <LoadingState loading={loadingHistory && !history} error={!!errorHistory} data={!!history && history.length > 0}>
      <LoadingState.Shimmer>
        <ShimmerBox height="32px" margin="10px 32px" width="50%" />
        <ShimmerBox height="32px" margin="10px 32px" width="40%" />
      </LoadingState.Shimmer>
      <LoadingState.Error>
        <Placeholder icon={FaIcon.Circle} title="Houve um erro ao obter o histórico do paciente">
          <Button variant="primary" size="sm">
            Tentar novamente
          </Button>
        </Placeholder>
      </LoadingState.Error>
      <LoadingState.NoData>
        {loadingHistory ? (
          <ShimmerBox height="60px" />
        ) : (
          <HistoryItem
            icon={<FaIcon.Star />}
            date={formatTimestampToDate(props.patient?.created_at)}
            user={`${props.patient?.profile.first_name} ${props.patient?.profile.last_name}`}
            event="cadastrou um paciente"
          />
        )}
      </LoadingState.NoData>
      <div>
        {/* Vertical Timeline #3 */}
        <div className="relative">
          <div>
            {history?.map((history: PatientHistoryModel) => (
              <HistoryItem
                key={history.id}
                icon={history.form_is_consultation ? <FaIcon.Consultation /> : <FaIcon.Survey />}
                date={formatTimestampToDate(history.created_at)}
                user={`${history.profile.first_name} ${history.profile.last_name}`}
                event={`${history.form_is_consultation ? 'realizou uma consulta' : 'realizou uma pesquisa'}`}
                link={`/patient/${props.patient?.id}/consultation/${history.id}`}>
                <Flex vAlign="start">
                  <Flex>
                    <H3>{history.form_title}</H3>
                  </Flex>
                  <Flex noGrow>
                    <LinkButton
                      variant="neutral"
                      size="sm"
                      link
                      to={`/patient/${props.patient?.id}/consultation/${history.id}`}>
                      <FaIcon.ExternalLink className="size-md" />
                    </LinkButton>
                  </Flex>
                </Flex>
              </HistoryItem>
            ))}
            <HistoryItem
              icon={<FaIcon.Star />}
              date={formatTimestampToDate(props.patient?.created_at)}
              user={`${props.patient?.profile.first_name} ${props.patient?.profile.last_name}`}
              event="cadastrou um paciente"
            />
          </div>
        </div>
      </div>
    </LoadingState>
  );
};

interface HistoryItemProps {
  date: string;
  user: string;
  event: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
}

const HistoryItem = (props: HistoryItemProps) => {
  const { root, header, headerContent, icon, date, title, card, name } = historyItem();

  return (
    <div className={root()}>
      <div className={header()}>
        <div className={headerContent()}>
          {/* Icon */}
          <div className={icon()}>{props.icon}</div>
          {/* Date */}
          <time className={date()}>{props.date}</time>
        </div>
        {/* Title */}
        <div className={title()}>
          <span className={name()}>{props.user}</span>{' '}
          <Link to={props.link || ''} className={props.link ? 'text-primary' : ''}>
            {props.event}
          </Link>
        </div>
      </div>
      {/* Card */}
      {props.children && (
        <div className={card()}>
          <Card noShadow>
            <Card.Item>{props.children}</Card.Item>
          </Card>
        </div>
      )}
    </div>
  );
};

const historyItem = tv({
  slots: {
    root: 'relative pb-lg',
    header: 'mb-3 items-center md:flex md:space-x-sm',
    headerContent: 'flex items-center space-x-md md:space-x-reverse',
    icon: 'z-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-neutral-xxsoft shadow md:order-1 text-primary',
    date: 'font-medium text-sm font-secondary w-[6.5rem] text-left md:text-right',
    title: 'ml-[3.5rem] text-slate-500 md:ml-sm',
    card: [
      'relative z-0  ml-[3.5rem] md:ml-[11rem]',
      'before:-mt-[32px] before:-ml-[36px] before:absolute before:inset-0 before:h-[calc(100%+56px)] before:w-[2px] before:bg-neutral-soft',
      'md:before:mt-0 md:before:h-[calc(100%+24px)]',
    ],
    name: 'font-bold text-slate-900',
  },
});
